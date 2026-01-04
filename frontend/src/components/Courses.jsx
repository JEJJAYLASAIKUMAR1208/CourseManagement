import { useEffect, useState } from "react";
import api from "../api/axios";
import { isAdmin, getRole } from "../utils/auth";
import "./Courses.css";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState(null);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null); // ⭐ NEW
  const [courseForm, setCourseForm] = useState({
    name: "",
    description: "",
    instructor: "",
  });

  const role = getRole();

  const fetchCourses = () => {
    api.get("/courses").then(res => setCourses(res.data));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const selectCourse = (id) => {
    api.get(`/courses/${id}`).then(res => setSelected(res.data));
  };

  const handleChange = (e) => {
    setCourseForm({ ...courseForm, [e.target.name]: e.target.value });
  };

  // ✅ ADD or UPDATE
  const saveCourse = () => {
    if (editingCourseId) {
      // UPDATE
      api.put(`/courses/${editingCourseId}`, courseForm).then(() => {
        fetchCourses();
        resetForm();
      });
    } else {
      // ADD
      api.post("/courses", courseForm).then(() => {
        fetchCourses();
        resetForm();
      });
    }
  };

  // ✅ EDIT
  const editCourse = () => {
    setCourseForm({
      name: selected.name,
      description: selected.description,
      instructor: selected.instructor,
    });
    setEditingCourseId(selected.id);
    setShowForm(true);
  };

  // ✅ DELETE
  const deleteCourse = () => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    api.delete(`/courses/${selected.id}`).then(() => {
      fetchCourses();
      setSelected(null);
    });
  };

  const resetForm = () => {
    setCourseForm({ name: "", description: "", instructor: "" });
    setEditingCourseId(null);
    setShowForm(false);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        Welcome, {role === "admin" ? "Admin" : "Student"}
      </div>

      <div className="courses-wrapper">
        <div className="courses-title">
          {isAdmin() ? "Manage Courses" : "Your Available Courses"}
        </div>

        {/* ADMIN: Add Button */}
        {isAdmin() && (
          <button className="btn-add" onClick={() => setShowForm(true)}>
            + Add New Course
          </button>
        )}

        {/* ADMIN: Add / Edit Form */}
        {isAdmin() && showForm && (
          <div className="course-form">
            <h3>{editingCourseId ? "Update Course" : "Add Course"}</h3>

            <input
              type="text"
              name="name"
              placeholder="Course Name"
              value={courseForm.name}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Course Description"
              value={courseForm.description}
              onChange={handleChange}
            />

            <input
              type="text"
              name="instructor"
              placeholder="Instructor Name"
              value={courseForm.instructor}
              onChange={handleChange}
            />

            <div className="form-actions">
              <button onClick={saveCourse} className="update">
                {editingCourseId ? "Update" : "Save"}
              </button>
              <button className="secondary" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Course Grid */}
        <div className="course-grid">
          {courses.map(course => (
            <div
              key={course.id}
              className="course-card"
              onClick={() => selectCourse(course.id)}
            >
              <h4>{course.name}</h4>
            </div>
          ))}
        </div>

        {/* Course Details */}
        {selected && (
          <div className="course-details">
            <h3>{selected.name}</h3>
            <p>{selected.description || "No description available"}</p>

            <span className="instructor-badge">
              Instructor: {selected.instructor}
            </span>

            {/* ADMIN ACTIONS */}
            {isAdmin() && (
              <div className="admin-actions">
                <button className="btn-edit" onClick={editCourse}>
                  Edit
                </button>
                <button className="btn-delete" onClick={deleteCourse}>
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
