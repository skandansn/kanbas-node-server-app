import db from "../Database/index.js";
function AssignmentsRoutes(app) {

    app.put("/api/courses/:cid/assignments/:id", (req, res) => {
        const { cid, id } = req.params;
        const assignmentIndex = db.assignments.findIndex(
            (a) => a._id === id);
        db.assignments[assignmentIndex] = {
            ...db.assignments[assignmentIndex],
            ...req.body
        };
        res.sendStatus(204);
    });

    app.delete("/api/courses/:cid/assignments/:id", (req, res) => {
        const { cid, id } = req.params;
        db.assignments = db.assignments.filter((a) => a._id !== id);
        res.sendStatus(200);
    });

    app.post("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const newAssign = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        db.assignments.push(newAssign);
        res.send(newAssign);
    });

    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = db.assignments
            .filter((a) => a.course === cid);
        res.send(assignments);
    });


    app.get("/api/courses/:cid/assignments/:id", (req, res) => {
        const { cid, id } = req.params;
        const assignment = db.assignments
            .filter((a) => a.course === cid && a._id === id);
        if (!assignment) {
            res.status(404).send("Assignment not found");
            return;
        }
        res.send(assignment);
    });
}
export default AssignmentsRoutes;