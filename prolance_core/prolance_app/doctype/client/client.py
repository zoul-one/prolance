# Copyright (c) 2026, zoul and contributors
# For license information, please see license.txt

import frappe
import re
from frappe.model.document import Document


class Client(Document):
    def validate(self):
        if self.phone and not re.fullmatch(r"\d{10}", self.phone):
            frappe.throw("Phone number must be exactly 10 digits.")

        self.set("projects", [])
        projects = frappe.get_all(
            "Project",
            filters={"client": self.name},
            fields=[
                "name",
                "project_name",
                "project_type",
                "status",
                "deadline",
                "value",
                "delivered_at"
            ]
        )

        for project in projects:
            self.append("projects", {
                "project": project.name,
                "project_name": project.project_name,
                "project_type": project.project_type,
                "status": project.status,
                "deadline": project.deadline,
                "value": project.value,
                "delivered_at": project.delivered_at
            })