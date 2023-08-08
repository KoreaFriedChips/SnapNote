import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom";
import { Note } from "../App"

type NoteLayoutProps = {
    notes: Note[]
}
export function NoteLayout({notes}: NoteLayoutProps) {
    const {id} = useParams();
    const note = notes.find(note => note.id === id);
    if (note === null)
        return <Navigate to="/" replace/>
    
    const photos = note?.photos || [];
    if (photos.length > 0 )
        return (
            <Outlet context={{ ...note, photos: note?.photos.map((file) => new Blob([file], { type: file.type })) }} />
        )
    else 
        return (
            <Outlet context={note} />
        )
}

export function useNote() {
    return useOutletContext<Note>();
}