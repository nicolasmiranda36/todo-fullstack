import { supabase } from "@/lib/supabaseClient" ;
import { NextResponse } from "next/server";

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