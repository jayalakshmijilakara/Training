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

frappe.ui.form.on('Training', {
    before_workflow_action: async (frm) => {
        let workflow_action = frm.selected_workflow_action;

        if (workflow_action === 'Reject') {
          
            if (!frm.doc.reason_for_rejection) {
               
                frm.toggle_display('reason_for_rejection', true);

                
                frappe.dom.unfreeze();
                const promptPromise = new Promise((resolve, reject) => {
                    frappe.prompt(
                        [
                            {
                                fieldtype: 'Data',
                                label: 'Reason for Rejection',
                                fieldname: 'rejection_reason',
                                reqd: 1
                            }
                        ],
                        (values) => {
                            
                            frm.set_value('reason_for_rejection', values.rejection_reason);
                            resolve(values.rejection_reason);
                        },
                        'Enter Rejection Reason',
                        'Submit'
                    );
                });

                
                await promptPromise;

                
                await frm.save();
            }
        }
    },
    
    refresh: function(frm) {

        frm.toggle_display('reason_for_rejection', frm.doc.workflow_state === 'Rejected');
    }
});



frappe.ui.form.on('Training', {
    before_workflow_action: async (frm) => {
        let workflow_action = frm.selected_workflow_action;

        if (workflow_action === 'Send for Review') {
          
            if (!frm.doc.reason_for_rejection) {
               
                frm.toggle_display('reason_for_review', true);

                
                frappe.dom.unfreeze();
                const promptPromise = new Promise((resolve, reject) => {
                    frappe.prompt(
                        [
                            {
                                fieldtype: 'Data',
                                label: 'Reason for Review',
                                fieldname: 'review_reason',
                                reqd: 1
                            }
                        ],
                        (values) => {
                            
                            frm.set_value('reason_for_review', values.review_reason);
                            resolve(values.review_reason);
                        },
                        'Enter Review Reason',
                        'Submit'
                    );
                });

                
                await promptPromise;

                
                await frm.save();
            }
        }
    },
    
    refresh: function(frm) {
      
        frm.toggle_display('reason_for_review', true);
    }
});


frappe.ui.form.on('Topics Learned', {
    
    date: function(frm, cdt, cdn) {
        validate_dates(frm, cdt, cdn);
    },
    to_date: function(frm, cdt, cdn) {
        validate_dates(frm, cdt, cdn);
    }
});

function validate_dates(frm, cdt, cdn) {
    const row = locals[cdt][cdn];
    const from_date = row.date;
    const to_date = row.to_date;

    if (from_date && to_date && to_date < from_date) {
        frappe.throw(__('To Date cannot be less than From Date.'));
    }
}

