import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import  firestoreInstance  from "../API/index";

interface FirestoreDocument {
  id: string;
  [key: string]: any;
}

interface FirestoreState {
  data: FirestoreDocument[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: FirestoreState = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchDocuments = createAsyncThunk(
  "firestore/fetchDocuments",
  async ({ collection, idToken }: { collection: string; idToken: string }) => {
    const response = await firestoreInstance.get(`/${collection}`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    return response.data.documents.map((doc: any) => ({
      id: doc.name.split("/").pop(),
      ...doc.fields,
    }));
  }
);

export const addDocument = createAsyncThunk(
  "firestore/addDocument",
  async ({
    collection,
    data,
    idToken,
  }: {
    collection: string;
    data: any;
    idToken: string;
  }) => {
    const response = await firestoreInstance.post(`/${collection}`, data, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    return {
      id: response.data.name.split("/").pop(),
      ...response.data.fields,
    };
  }
);

const firestoreSlice = createSlice({
  name: "firestore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchDocuments.fulfilled,
        (state, action: PayloadAction<FirestoreDocument[]>) => {
          state.data = action.payload;
        }
      )
      .addCase(
        addDocument.fulfilled,
        (state, action: PayloadAction<FirestoreDocument>) => {
          state.data.push(action.payload);
        }
      );
  },
});

export default firestoreSlice.reducer;
