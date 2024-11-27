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

        frm.toggle_display('reason_for_rejection', true);
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


frappe.ui.form.on('Training', {
    before_workflow_action: async (frm) => {
        const workflow_action = frm.selected_workflow_action;

        if (workflow_action === 'Send for Approval') {
            frappe.dom.unfreeze();

            let validation_message = "";
            for (let topic_row of frm.doc.topics_learned || []) {
                if (topic_row.module_name === 'Accounts') {
                    frm.toggle_reqd('exam_on_accounts', true);

                    const accounts_id = topic_row.exam_on_accounts;
                    if (!accounts_id) {
                        validation_message = __('Accounts exam is missing for {0}', [topic_row.module_name]);
                        break;
                    }

                    const accountDoc = await frappe.db.get_doc('Accounts Module Questions', accounts_id);
                    if (accountDoc.docstatus !== 1) {
                        validation_message = __('Please submit the Exam Doctype for {0}', [topic_row.module_name]);
                        break;
                    }
                }

                if (topic_row.module_name === 'Buying') {
                    frm.toggle_reqd('exam_on_buying_module', true);

                    const buying_id = topic_row.exam_on_buying_module;
                    if (!buying_id) {
                        validation_message = __('Buying exam is missing for {0}', [topic_row.module_name]);
                        break;
                    }

                    const buyingDoc = await frappe.db.get_doc('Buying Module Questions', buying_id);
                    if (buyingDoc.docstatus !== 1) {
                        validation_message = __('Please submit the Exam Doctype for {0}', [topic_row.module_name]);
                        break;
                    }
                }

                if (topic_row.module_name === 'Selling') {
                    frm.toggle_reqd('exam_on_sales_module', true);

                    const selling_id = topic_row.exam_on_sales_module;
                    if (!selling_id) {
                        validation_message = __('Selling exam is missing for {0}', [topic_row.module_name]);
                        break;
                    }

                    const sellingDoc = await frappe.db.get_doc('Sales Module Questions', selling_id);
                    if (sellingDoc.docstatus !== 1) {
                        validation_message = __('Please submit the Exam Doctype for {0}', [topic_row.module_name]);
                        break;
                    }
                }

                if (topic_row.module_name === 'Manufacturing') {
                    frm.toggle_reqd('exam_on_accounts', true);

                    const manufacturing_id = topic_row.exam_on_manufacturing;
                    if (!manufacturing_id) {
                        validation_message = __('Manufacturing exam is missing for {0}', [topic_row.module_name]);
                        break;
                    }

                    const manufacturingDoc = await frappe.db.get_doc('Manufacturing Module Questions', manufacturing_id);
                    if (manufacturingDoc.docstatus !== 1) {
                        validation_message = __('Please submit the Exam Doctype for {0}', [topic_row.module_name]);
                        break;
                    }
                }
            }
            if (validation_message) {
                await new Promise((resolve, reject) => {
                    frappe.prompt(
                        [
                            {
                                fieldtype: 'HTML',
                                options: `<div style="margin-bottom: 10px; color: red;">${validation_message}</div>`,
                                fieldname: 'message',
                            },
                        ],
                        () => {
                            reject(false); 
                        },
                        __('Validation Required'),
                        __('Close') 
                    );
                });

                frappe.validated = false;
                return false;
            }
        }
    }
});
