import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Checkbox,
    ListItemText,
    Button,
    Typography,
    Card,
    Divider
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useAppSelector, type AppDispatch } from "../../store/store";
import { addFilter, removeFilter, setListParams } from "../../pages/customer-management/services/slice";
import { useEffect, useState } from "react";

const STATUS_OPTIONS = ["ACTIVE", "INACTIVE"];
const STATUS_OPTIONSs = [{
    label: 'Active', key: 'ACTIVE',
}, {
    label: 'Inactive', key: 'INACTIVE',
}
];

export default function Filter({ closeFilter }) {
    const dispatch = useDispatch<AppDispatch>();

    const listParams = useAppSelector(
        (state) => state.customerManagementSlice.listParams
    );

    const [tempStatus, setTempStatus] = useState<string[]>([]);

    // Sync Redux → UI
    useEffect(() => {
        if (!listParams.status) {
            setTempStatus([]);
        } else {
            setTempStatus([listParams.status]);
        }
    }, [listParams.status]);

    const handleChange = (event: any) => {
        const value = event.target.value;
        setTempStatus(typeof value === "string" ? value.split(",") : value);
    };

    // Apply
    const applyFilter = () => {
        let statusToSend: string | undefined;

        if (tempStatus.length === 1) {
            statusToSend = tempStatus[0];
        }

        dispatch(
            setListParams({
                ...listParams,
                page: 0,
                status: statusToSend,
            })
        );
        closeFilter(null)
        dispatch(addFilter())
        setIsFilterApplied(true)
    };

    // Reset
    const resetFilter = () => {
        setTempStatus([]);

        dispatch(
            setListParams({
                ...listParams,
                page: 0,
                status: undefined,
            })
        );
        closeFilter(null)
        dispatch(removeFilter())
        setIsFilterApplied(false)
    };

    const isDisabled = tempStatus.length === 0;

    return (
        <>
            <div >
                {/* 🔹 Heading */}
                <Typography variant="h6" sx={{ mb: 1 }}>
                    Filters
                </Typography>

                <Divider sx={{ mb: 2 }} />

                {/* 🔹 Filter Row */}
                <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
                    <FormControl sx={{ minWidth: 240 }} size="small">
                        <InputLabel>Status</InputLabel>

                        <Select
                            multiple
                            value={tempStatus}
                            onChange={handleChange}
                            // renderValue={(selected) => selected.join(", ")}
                            label="Status"
                            renderValue={(selected) => {
                                if (selected.length === 0) {
                                    return <span style={{ color: "#9ca3af" }}>Select Status</span>;
                                }
                                return selected
                                    .map((key) => {
                                        const item = STATUS_OPTIONSs.find((s) => s.key === key);
                                        return item?.label;
                                    })
                                    .join(", ");
                            }}
                        >
                            {STATUS_OPTIONSs.map((status) => (
                                <MenuItem key={status.key} value={status.key}>
                                    <Checkbox checked={tempStatus.includes(status.key)} />
                                    <ListItemText primary={status.label} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                {/* 🔹 Buttons */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 2,
                        mt: 3
                    }}
                >
                    <Button
                        variant="outlined"
                        onClick={resetFilter}
                    >
                        Reset
                    </Button>

                    <Button
                        variant="contained"
                        disabled={isDisabled}
                        onClick={applyFilter}
                    >
                        Apply
                    </Button>
                </Box>
            </div>
        </>
    );
}