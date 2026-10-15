frappe.ui.form.on('Client', {
    refresh: function(frm) {
        calculate_commission(frm);

        frm.add_custom_button('Create Project', function() {
            let d = new frappe.ui.Dialog({
                title: 'Create Project',
                fields: [
                    {
                        label: 'Freelancer',
                        fieldname: 'freelancer',
                        fieldtype: 'Data',
                        default: frm.doc.freelancer,
                        read_only: 1
                    },
                    {
                        label: 'Client',
                        fieldname: 'client',
                        fieldtype: 'Link',
                        options: 'Client',
                        default: frm.doc.name,
                        read_only: 1,
                        reqd: 1
                    },
                    {
                        label: 'Project Name',
                        fieldname: 'project_name',
                        fieldtype: 'Data',
                        reqd: 1
                    },
                    {
                        label: 'Project Type',
                        fieldname: 'project_type',
                        fieldtype: 'Select',
                        options: '\nLogo Design\nBranding / Strategy\nBranding Kit (Design)\nWebsite Development\nWriting\nSocial Media\nAdvertisements\nPoster\nOthers'
                    },
                    {
                        label: 'Status',
                        fieldname: 'status',
                        fieldtype: 'Select',
                        options: '\nIn Progress\nAwaiting Payment\nCompleted'
                    },
                    {
                        label: 'Deadline',
                        fieldname: 'deadline',
                        fieldtype: 'Date',
                        reqd: 1
                    },
                    {
                        label: 'Value',
                        fieldname: 'value',
                        fieldtype: 'Currency',
                        default: 0
                    },
                    {
                        label: 'Is Revision',
                        fieldname: 'is_revision',
                        fieldtype: 'Check'
                    },
                    {
                        label: 'Delivered At',
                        fieldname: 'delivered_at',
                        fieldtype: 'Datetime',
                        reqd: 1
                    },
                    {
                        label: 'Created At',
                        fieldname: 'created_at',
                        fieldtype: 'Datetime'
                    },
                    {
                        label: 'Updated At',
                        fieldname: 'updated_at',
                        fieldtype: 'Datetime'
                    }
                ],
                primary_action_label: 'Create',
                primary_action(values) {
                    frappe.call({
                        method: 'prolance_core.prolance_app.doctype.project.project.create_project',
                        args: values,
                        callback: function(r) {
                            if (r.message) {
                                d.hide();
                                frappe.msgprint('Project created successfully!');
                            }
                        }
                    });
                }
            });

            d.show();
        });
    },

    invoice_amount: function(frm) {
        calculate_commission(frm);
    },

    comission_percentage: function(frm) {
        calculate_commission(frm);
    }
});

function calculate_commission(frm) {
    if (frm.doc.invoice_amount != null && frm.doc.comission_percentage != null) {
        frm.set_value(
            'comission_amount',
            frm.doc.invoice_amount * frm.doc.comission_percentage / 100
        );
    }
}