import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

type CommonDialogProps = {
    open: boolean;
    title: string;
    description: string;
    onClose: () => void;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
};

export default function CommonDialog({
    open,
    title,
    description,
    onClose,
    onConfirm,
    confirmText = "Yes",
    cancelText = "No",
}: CommonDialogProps) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                "& .MuiDialog-paper": {
                    width: "400px",
                    maxWidth: "none",
                },
            }}
        >
            <DialogTitle sx={{ textAlign: 'center' }}>{title}</DialogTitle>

            <DialogContent>
                <DialogContentText sx={{ textAlign: 'center' }}>{description}</DialogContentText>
            </DialogContent>

            <DialogActions
                sx={{
                    justifyContent: "center",
                    padding: "20px",
                    gap: 2,
                }}
            >
                <Button sx={{ width: '100px',textTransform:'none' }} onClick={onClose} variant="outlined">
                    {cancelText}

                </Button>

                <Button
                    sx={{ width: '100px',textTransform:'none' }}
                    onClick={() => {
                        onConfirm();
                        onClose(); // optional: auto close
                    }}
                    variant="contained"
                >
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}