import { NextRequest, NextResponse } from "next/server";
import { auth, db } from "../../../../firebase_app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ToDoData } from "@/provider/context";
import toDate from "date-fns/toDate";

type ToDoRequestBody = ToDoData & { uid: string };

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json());
    const { data } = body;
    const { title, date, desc, bgColor } = data;
    console.log(title, date, desc, bgColor);
    const uid = request.nextUrl.searchParams.get("uid");
    // user uid will be the doc id.
    if (uid) {
      const userDocRef = doc(db, "users", uid);
      const userTodoCollection = collection(userDocRef, "todos"); // collection of todos belonging to user
      const convertDate =
        new Date(date).getMonth() +
        1 +
        "/" +
        new Date(date).getDate() +
        "/" +
        new Date(date).getFullYear();
      const todoDocRef = await addDoc(userTodoCollection, {
        id: "",
        title: title,
        date: convertDate,
        desc: desc,
        bgColor: bgColor,
      });
      await updateDoc(todoDocRef, { id: todoDocRef.id });
      return NextResponse.json(todoDocRef.id, { status: 200 });
    } else {
      throw new Error("User not signed in.");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function GET(request: NextRequest) {
  try {
    //fetch todos from the db
    const uid: string | null = request.nextUrl.searchParams.get("uid");
    if (uid) {
      const todoCollectionRef = collection(doc(db, "users", uid), "todos");
      const userTodoDocsSnapshot = await getDocs(todoCollectionRef);
      const signedUsertodos: ToDoData[] = [];
      userTodoDocsSnapshot.docs.forEach((todoDoc) => {
        const todoData: ToDoData = todoDoc.data() as ToDoData;
        signedUsertodos.push(todoData);
      });
      return NextResponse.json(signedUsertodos, { status: 201 });
    } else {
      return NextResponse.json(
        { message: "User not signed in" },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = (await request.json()) as ToDoData;
    const uid = request.nextUrl.searchParams.get("uid");
    const todoId = request.nextUrl.searchParams.get("todoId");
    if (uid && todoId) {
      const modifyTodoDocRef = doc(db, "users", uid, "todos", todoId);
      await updateDoc(modifyTodoDocRef, body);
      return NextResponse.json(
        { message: `Modified the todo ${todoId}` },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "User not signed in or Todo id not found" },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const uid = request.nextUrl.searchParams.get("uid");
    const todoId = request.nextUrl.searchParams.get("todoId");
    if (uid && todoId) {
      await deleteDoc(doc(db, "users", "todos", todoId));
      return NextResponse.json(
        { message: `Deleted todo ${todoId}` },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "User not signed in" },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log(error);
  }
}
