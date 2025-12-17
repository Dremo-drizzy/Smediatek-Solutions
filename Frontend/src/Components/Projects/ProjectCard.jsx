import { Card, Button, Badge } from "react-bootstrap";

const ProjectCard = ({ project }) => {
  return (
    <Card className="project-card h-100 shadow-sm">
      <Card.Img variant="top" src={project.img} alt={project.title} />
      <Card.Body>
        <Card.Title>{project.title}</Card.Title>
        <Card.Text className="text-muted">{project.desc}</Card.Text>
        <div className="mb-3">
          {project.tech.map((t, i) => (
            <Badge key={i} bg="dark" className="me-1">{t}</Badge>
          ))}
        </div>
        <div className="d-flex justify-content-between">
          <Button variant="primary" size="sm" href={project.link} target="_blank">
            Live Demo
          </Button>
          <Button variant="outline-dark" size="sm" href={project.github} target="_blank">
            GitHub
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;
