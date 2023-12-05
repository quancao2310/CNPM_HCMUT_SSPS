import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

function FilePreview({ docs }){
    return (
        <DocViewer
            pluginRenderers={DocViewerRenderers}
            documents={docs}
        />
    );
}

export default FilePreview;