function validateParticipant(req, res, next) {
    const { email, firstname, lastname, dob, work, home } = req.body;

    if(!email) {
        return res.status(400).json({ error: "email is required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "invalid email format"});
    }
    if(!firstname) {
        return res.status(400).json({ error: "firstname is required" });
    }
    if(!lastname) {
        return res.status(400).json({ error: "lastname is required" });
    }
    if(!dob) {
        return res.status(400).json({ error: "Date of birth is required" });
    }
    const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
    if(!dobRegex.test(dob)) {
        return res.status(400).json({ error: "Invalid format for date of birth" });
    }
    const date = new Date(dob);
    if(isNaN(date.getTime())) {
        return res.status(400).json({ error: "dob must be a valid date" });
    }
    if(!work || typeof work !== "object") {
        return res.status(400).json({ error: "Work object is required"});
    }
    const { companyname, salary, currency } = work;
    if(!companyname) {
        return res.status(400).json({ error: "Companyname is required" });
    }
    if(salary = null) {
        return res.status(400).json({ error: "Salary is required" });
    }
    if(typeof salary !== "number") {
        return res.status(400).json({ error: "Salary must be a number" });
    }
    if(!currency) {
        return res.status(400).json({ error: "Currency is required" });
    }

    if(!home || typeof home !== "object") {
        return res.status(400).json({ error: "Home object is required" });
    }
    const { country, city } = home;
    if(!country) {
        return res.status(400).json({ error: "Country is required" });
    }
    if(!city) {
        return res.status(400).json({ error: "City is required" });
    }
    next();
}

module.exports = { validateParticipant };