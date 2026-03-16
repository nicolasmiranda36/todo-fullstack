import { supabase } from "@/lib/supabaseClient" ;
import { NextResponse } from "next/server";

/*
export async function DELETE(request, { params }) {
    const id = Number(params.id);

    const { error } = await supabase
        .from("todos")
        .delete()
        .eq("id", id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Eliminado correctamente" });
} 

    export async function DELETE(request, context) {

    console.log("Context completo:", context);
    console.log("Params:", context.params);
    console.log("ID crudo:", context.params?.id);

    const id = Number(context.params?.id);

    console.log("ID convertido:", id);

    const { error } = await supabase
        .from("todos")
        .delete()
        .eq("id", id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Eliminado correctamente" });
}*/

export async function DELETE(request, context) {

    const { id } = await context.params; 
    console.log("ID recibido:", id);
    const idNumber = parseInt(id);

    if (isNaN(idNumber)) {
    return NextResponse.json(
        { error: "ID inválido" },
        { status: 400 });
    }

    const { error } = await supabase
        .from("todos")
        .delete()
        .eq("id", idNumber);

    if (error) {
        return NextResponse.json(
        { error: error.message },
        { status: 500 }
    );
    }

    return NextResponse.json({ message: "Eliminado correctamente" });
}

