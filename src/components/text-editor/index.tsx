import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./index.css"
type textEditorProps = {
    data: string,
    onChange: (
        value: string,
        delta: any,
        source: any,
        editor: any
    ) => void;
    onBlur?: () => void;
};


export default function TextEditor({ data, onChange, onBlur }: textEditorProps) {
    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "color",
        "background",
        "align",
        "list",
        "link",
        "image",
    ];
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
        ],
    };
    return (
        <div className="editor-wrapper">
            <ReactQuill
                value={data}
                onChange={onChange}
                modules={modules}
                formats={formats}
                onBlur={onBlur}
            />
        </div>
    )
}
