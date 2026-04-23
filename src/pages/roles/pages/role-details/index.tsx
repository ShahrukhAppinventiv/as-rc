import Breadcrumbs from '../../../../components/breadcrumbs'
import { useRoleDetailsHelper } from './role-details-helper'

import {
  Checkbox,
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Paths } from "../../../../constants/path";

export default function ViewRole() {
  const { breadcrumbs,
    transformPermissions,
    permissionsList,
    roleId,
    dispatch,
    roleDetials,
    navigate
  } = useRoleDetailsHelper();

  // ✅ Selected permissions for edit mode
  const selectedPermissionIds =
    roleDetials?.permissions?.map((p: any) => p.id) || [];
  const roleSchema = Yup.object({
    name: Yup.string().trim().required("Role name is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: roleDetials?.name || "",
      permissions: transformPermissions(
        permissionsList,
        selectedPermissionIds
      ),
    },
    validationSchema: roleSchema,
    onSubmit: (values) => {
      const permissionIds: string[] = [];

      values.permissions.forEach((p: any) => {
        if (p.view?.checked) permissionIds.push(p.view.id);
        if (p.edit?.checked) permissionIds.push(p.edit.id);
      });

      const payload = {
        name: values.name,
        permissionIds,
      };

      if (roleId) {
        // dispatch(updateRole({ id: roleId, ...payload }))
        navigate(Paths.ROLES)
      } else {
        // dispatch(addRole(payload));
      }
    },
  });

  // ✅ Select All Logic
  const handleSelectAll = (type: "view" | "edit") => {
    const allSelected = formik.values.permissions.every(
      (p: any) => p[type]?.checked
    );

    const newVal = !allSelected;

    const updated = formik.values.permissions.map((p: any) => {
      // ✅ VIEW ALL
      if (type === "view") {
        return {
          ...p,
          view: p.view
            ? { ...p.view, checked: newVal }
            : null,
          // ❌ DO NOT touch edit anymore
          edit: p.edit,
        };
      }

      // ✅ EDIT ALL
      if (type === "edit") {
        return {
          ...p,
          edit: p.edit
            ? { ...p.edit, checked: newVal }
            : null,
          // ✅ if edit ON → force view ON
          view: p.view
            ? {
              ...p.view,
              checked: newVal ? true : p.view.checked,
            }
            : null,
        };
      }

      return p;
    });

    formik.setFieldValue("permissions", updated);
  };

  // ✅ Loading state
  if (!permissionsList?.length || (roleId && !roleDetials)) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <>
      <Breadcrumbs
        items={breadcrumbs}
      />

      <form onSubmit={formik.handleSubmit} className="p-6">
        <Card className="shadow-md rounded-xl">
          <CardContent className="space-y-6">

            {/* Role Name */}
            <div>
              <TextField
                fullWidth
                name="name"
                variant="outlined"
                placeholder="Enter Role Name"
                value={formik.values.name}
                error={formik.touched.name && !!formik.errors.name}
                helperText={
                  formik.touched.name && typeof formik.errors.name === "string"
                    ? formik.errors.name
                    : ""
                }
                size="small"
                disabled
              />
            </div>

            <Divider />

            {/* Permissions Table */}
            <div className="border rounded-lg overflow-hidden">

              {/* Header */}
              <div className="grid grid-cols-3 bg-gray-100 p-3 text-sm font-semibold items-center">
                {/* Permissions */}
                <div className="pl-2">Permissions</div>

                {/* View All */}
                <div className="flex justify-center items-center">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      size="small"
                      disabled={true}
                      onChange={() => handleSelectAll("view")}
                      checked={formik.values.permissions.every(
                        (p: any) => p.view?.checked
                      )}
                    />
                    <span>View All</span>
                  </div>
                </div>

                {/* Edit All */}
                <div className="flex justify-center items-center">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      size="small"
                      disabled={true}
                      onChange={() => handleSelectAll("edit")}
                      checked={formik.values.permissions.every(
                        (p: any) => p.edit?.checked
                      )}
                    />
                    <span>Edit All</span>
                  </div>
                </div>
              </div>

              {/* Rows */}
              {formik.values.permissions.map(
                (perm: any, index: number) => (
                  <div
                    key={perm.module}
                    className="grid grid-cols-3 items-center p-3 border-t text-sm"
                  >
                    {/* Module */}
                    <div className="pl-2 capitalize">
                      {perm.module.replace(/_/g, " ")}
                    </div>

                    {/* View */}
                    <div className="flex justify-center items-center">
                      <Checkbox
                        disabled={true}
                        size="small"
                        checked={perm.view?.checked || false}
                        onChange={(e) => {
                          const checked = e.target.checked;

                          formik.setFieldValue(
                            `permissions[${index}].view.checked`,
                            checked
                          );
                        }}
                      />
                    </div>

                    {/* Edit */}
                    <div className="flex justify-center items-center">
                      <Checkbox
                        disabled={true}
                        size="small"
                        checked={perm.edit?.checked || false}
                        onChange={(e) => {
                          const checked = e.target.checked;

                          formik.setFieldValue(
                            `permissions[${index}].edit.checked`,
                            checked
                          );

                          if (checked && perm.view) {
                            formik.setFieldValue(
                              `permissions[${index}].view.checked`,
                              true
                            );
                          }
                        }}
                      />
                    </div>
                  </div>
                )
              )}
            </div>

          </CardContent>
        </Card>
      </form>
    </>
  );
}
