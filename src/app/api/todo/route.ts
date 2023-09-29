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

export type ToDoRequestBody = ToDoData & { uid: string };

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // const { data } = body;
    const { title, date, desc, bgColor } = body;
    console.log(body);
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
    const uid = request.nextUrl.searchParams.get("uid");
    const id = request.nextUrl.searchParams.get("id");
    if (uid && id) {
      const userToDoDocRef = doc(db, "users", uid, "todos", id);
      const todo = await getDoc(userToDoDocRef);
      if (todo.exists()) {
        return NextResponse.json(todo.data(), { status: 201 });
      } else {
        return NextResponse.json(
          { message: "ToDo not found" },
          { status: 404 }
        );
      }
    } else if (uid) {
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
    const id = request.nextUrl.searchParams.get("id");
    if (id && uid) {
      const modifyTodoDocRef = doc(db, "users", uid, "todos", id);
      if ((await getDoc(modifyTodoDocRef)).exists()) {
        await updateDoc(modifyTodoDocRef, body);
        return NextResponse.json(
          { message: `Modified the todo ${id}` },
          { status: 201 }
        );
      } else {
        return NextResponse.json(
          { message: `todo not found :/` },
          { status: 404 }
        );
      }
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
    const id = request.nextUrl.searchParams.get("id");
    if (id && uid) {
      //delete specific doc
      const deleteTodoDocRef = doc(db, "users", uid, "todos", id);
      if ((await getDoc(deleteTodoDocRef)).exists()) {
        await deleteDoc(deleteTodoDocRef);
        return NextResponse.json(
          { message: "todo deleted", id: id },
          { status: 201 }
        );
      } else {
        return NextResponse.json(
          { message: `todo not found :/` },
          { status: 404 }
        );
      }
    } else if (uid) {
      //delete all docs
      const userTodoCollectionRef = collection(db, "users", uid, "todos");
      const userTodoDocsSnapshot = await getDocs(userTodoCollectionRef);
      userTodoDocsSnapshot.docs.forEach(async (todoDoc) => {
        await deleteDoc(todoDoc.ref);
      });
      if (userTodoDocsSnapshot.docs.length > 0) {
        return NextResponse.json(
          { message: `Deleted all todos` },
          { status: 201 }
        );
      } else {
        return NextResponse.json({ message: "No todos :/" }, {status:404});
      }
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
