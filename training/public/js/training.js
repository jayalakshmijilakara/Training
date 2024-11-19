frappe.ui.form.on('Training', {
    before_load: function (frm) {
        if (frm.is_new()) {
            const options = { user_id: frappe.session.user };
            const fields = ["name", "company"];
            frappe.db.get_value("Employee", options, fields).then(({ message }) => {
                if (message) {
                    // Set the employee and company fields if an employee record is found
                    frm.set_value("employee", message.name);
                    frm.set_value("company", message.company);
                }
            });
        }
    }
});
