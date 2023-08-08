import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "../App";
import { v4 as uuidV4 } from "uuid";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
  photos?: File[];
} & Partial<NoteData>;

export function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
  photos = [],
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>(photos); // Added state for uploaded photos
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
      photos: uploadedPhotos, // Use the uploadedPhotos state
    });
    navigate("..");
  }

  function handleUploadPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const newPhotos = Array.from(selectedFiles);
      setUploadedPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
    }
  }

  function handleDeletePhoto(index: number) {
    setUploadedPhotos((prevPhotos) => {
      const newPhotos = [...prevPhotos];
      newPhotos.splice(index, 1);
      return newPhotos;
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={3}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                ref={titleRef}
                defaultValue={title}
                required
                type="text"
                placeholder="Enter title"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                isMulti
                onCreateOption={(label) => {
                  const newTag = { id: uuidV4(), label };
                  onAddTag(newTag);
                  setSelectedTags((prevTags) => [...prevTags, newTag]);
                }}
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
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control
            ref={markdownRef}
            defaultValue={markdown}
            required
            as="textarea"
            rows={15}
          />
        </Form.Group>
        {/* Photo Upload */}
        <Form.Group controlId="photos">
          <Form.Label>Photos</Form.Label>
          <Form.Control type="file" multiple onChange={handleUploadPhoto} />
        </Form.Group>
        {uploadedPhotos.length > 0 && (
          <Form.Group controlId="uploadedPhotos">
            <Form.Label>Uploaded Photos</Form.Label>
            <Stack gap={2} direction="horizontal">
              {uploadedPhotos.map((photo, index) => (
                <div key={index} className="position-relative">
                  <Image
                    src={URL.createObjectURL(photo)}
                    alt={`Uploaded Photo ${index + 1}`}
                    width={100}
                    height={100}
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    className="position-absolute top-0 end-0"
                    onClick={() => handleDeletePhoto(index)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </Stack>
          </Form.Group>
        )}
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button variant="primary" type="submit">
            Save
          </Button>
          <Link to="..">
            <Button variant="outline-secondary" type="button">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
}
