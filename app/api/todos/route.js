//  imports primero
import { supabase } from "@/lib/supabaseClient" ;
import { NextResponse } from "next/server";

//GET -> Lista completa 
export async function GET() {
    const { data, error} = await supabase
        .from("todos")
        .select("*")
        .order("creado", {ascending: false});
    
        if(error){
            return NextResponse.json({error: error.message}, {status: 500});
        }
        return NextResponse.json(data);
}

//POST -> Nueva tarea
export async function POST(request) {
    const body = await request.json();
    const {tareas} = body;

    if(!tareas) {
        return NextResponse.json(
            {error: "Tarea obligatoria"},
            {status: 400}
        );
    }

    const {data, error} = await supabase 
        .from("todos")
        .insert([{tareas}])
        .select();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0], { status: 201 });
}

