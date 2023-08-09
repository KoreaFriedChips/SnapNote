import { useMemo, useState } from "react";
import { Badge, Button, Card, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Note, Tag } from "../App";
import styles from "../styles/NoteList.module.css"
import { tagColourMapping } from "../constants/TagColourMapping";
import "../styles/colours.css"

type SimpleNote = {
    id: string
    title: string
    tags: Tag[]
}
type NoteListProps = {
    availableTags: Tag[];
    notes: Note[]
    deleteTag: (id: string) => void;
    updateTag: (id: string, label: string) => void;
};
type EditTagsModalProps = {
    availableTags: Tag[];
    show: boolean;
    handleClose: () => void;
    onDelete: (id: string) => void;
    onUpdate: (id: string, label: string) => void;
};

export function NoteList({availableTags, notes, deleteTag, updateTag}: NoteListProps) {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [title, setTitle] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);

    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return (title === '' || note.title.toLowerCase().includes(title.toLowerCase())) && (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
        })
    }, [title, selectedTags, notes]);

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>SnapNote</h1>
          <h3>Note taking made easy</h3>
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to="/new">
              <Button variant="primary" type="button">
                Create
              </Button>
            </Link>
            <Button variant="outline-secondary" type="button" onClick={() => setShowModal(true)}>
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Search titles" value={title} onChange={e => setTitle(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
          <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                isMulti
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags?.map((tag) => {
                      return { id: tag.value, label: tag.label };
                    })
                  );
                }}
                className="text-dark"
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map(note => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
      <EditTagsModal onDelete={deleteTag} onUpdate={updateTag} availableTags={availableTags} show={showModal} handleClose={() => setShowModal(false)}/>
    </>
  );
}

function NoteCard({id, title, tags}: SimpleNote) {
    return (
        <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${styles.card}`}>
            <Card.Body>
                <Stack gap={2} className="align-items-center justify-content-center h-100">
                    <span className="fs-5 text-dark">{title}</span>
                    <Stack gap={1} direction="horizontal" className="justify-content-center flex-wrap">
                        {tags.map(tag => (
                            <Badge key={tag.id} className={`text-truncate ${tagColourMapping[tag.label.toLowerCase()] || ""}`}>{tag.label}</Badge>
                        ))}
                    </Stack>
                </Stack>
            </Card.Body>
        </Card>
    )
}

function EditTagsModal({availableTags, show, handleClose, onDelete, onUpdate}: EditTagsModalProps) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Tags</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                  <Stack gap={2}>
                    {availableTags.map(tag => (
                      <Row key={tag.id}>
                        <Col>
                            <Form.Control type="text" value={tag.label} onChange={e => onUpdate(tag.id, e.target.value)} />
                        </Col>
                        <Col xs="auto">
                          <Button variant="outline-danger" onClick={() => onDelete(tag.id)}>
                            &times;
                          </Button>
                        </Col>
                        </Row>
                    ))}
                  </Stack>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
