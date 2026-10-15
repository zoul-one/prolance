# Copyright (c) 2026, zoul and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Project(Document):
    def on_update(self):
        if self.client:
            client_doc = frappe.get_doc("Client", self.client)
            client_doc.save()

@frappe.whitelist()
def create_project(freelancer=None, client=None, project_name=None,
                   project_type=None, status=None, deadline=None,
                   value=0, is_revision=0, delivered_at=None,
                   created_at=None, updated_at=None):

    project = frappe.new_doc("Project")

    project.freelancer = freelancer
    project.client = client
    project.project_name = project_name
    project.project_type = project_type
    project.status = status
    project.deadline = deadline
    project.value = value
    project.is_revision = is_revision
    project.delivered_at = delivered_at
    project.created_at = created_at
    project.updated_at = updated_at

    project.insert()


    return project.name