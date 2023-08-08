import { Badge, Button, Col, Row, Stack, Image } from "react-bootstrap";
import { useNote } from "./NoteLayout";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { tagColourMapping } from "../constants/TagColourMapping";
import "../styles/colours.css"


type NoteProps = {
    onDelete: (id: string) => void;
}

export function Note({onDelete}: NoteProps) {
  const note = useNote();
  const navigate = useNavigate();
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {note.tags.map((tag) => (
                <Badge key={tag.id} className={`text-truncate ${tagColourMapping[tag.label.toLowerCase()] || ""}`}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary" type="button">
                Edit
              </Button>
            </Link>
            <Button variant="outline-danger" type="button" onClick={() => {
                onDelete(note.id);
                navigate('/');
            }}>
              Delete
            </Button>
            <Link to="/">
              <Button variant="outline-secondary" type="button">
                Back
              </Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
      {note.photos && note.photos.length > 0 && (
        <Row className="mb-4">
          <Col>
            <Stack gap={2} direction="horizontal" className="flex flex-wrap">
              {note.photos.map((photo, index) => (
                <Image key={index} src={URL.createObjectURL(photo)} alt={`Uploaded Photo ${index + 1}`} fluid />
              ))}
            </Stack>
          </Col>
        </Row>
      )}
    </>
  );
}
