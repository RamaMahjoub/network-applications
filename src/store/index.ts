import { configureStore } from "@reduxjs/toolkit";

import auth from "./authSlice";
import file from "./fileSlice";
import group from "./groupSlice";
import groupMember from "./groupMemberSlice";
import groupFile from "./groupFileSlice";
import report from "./reportSlice";

export const store = configureStore({
  reducer: {
    auth,
    file,
    group,
    groupMember,
    groupFile,
    report,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
