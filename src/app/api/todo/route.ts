import { NextResponse } from "next/server";
import { auth, db } from "../../../../firebase_app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

type ToDoRequestBody = {
  uid: string;
  title: string;
  date: string;
  desc: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ToDoRequestBody;
    console.log(body.title, body.date, body.desc, body.uid);
    // user uid will be the doc id.
    if (body.uid) {
      const userDocRef = doc(db, "users", body.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      const existingTodos: ToDoRequestBody[] =
        userDocSnapshot.data()?.todos || [];
      existingTodos.push(body);
      const newToDo = await setDoc(userDocRef, {
        todo: existingTodos,
      });
      return NextResponse.json(newToDo, { status: 200 });
    } else {
      throw new Error("User not signed in.");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function GET(request: Request) {
  try {
    //fetch todos from the db
    const uid: string | null = await request.json();
    if (uid) {
      const userDocSnapshot = await getDoc(doc(db, "users", uid));
      const signedUserTodos: ToDoRequestBody[] =
        userDocSnapshot.data()?.todos || [];
      return NextResponse.json(signedUserTodos, { status: 201 });
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

export async function DELETE(request: Request) {
  try {
    const uid: string | null = await request.json();
    if (uid) {
      const deletedTodo = await deleteDoc(doc(db, "users", uid));
      return NextResponse.json(deletedTodo, { status: 201 });
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

export async function PATCH(request:Request) {
  try {
    const body = await request.json();
    const {modifiedTodo,uid} = body;
    if(uid){
      const updatedDoc = await updateDoc(doc(db,"users",uid),{
        todos:modifiedTodo
      });
      return NextResponse.json(updatedDoc, { status: 201 });
    } else{
      return NextResponse.json(
        { message: "User not signed in" },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log(error);
  }
}
