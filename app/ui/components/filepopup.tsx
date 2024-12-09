import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
type FilePopupProps = {
    file: { id: string; name: string } | null
    isOpen: boolean
    onClose: () => void
}

export function FilePopup({ file, isOpen, onClose }: FilePopupProps) {
    if (!file) return null

    //const info = fileInfo[file.id]

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{file.name}</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                    <p><strong>File ID:</strong> {file.id}</p>
                    <p><strong>Name:</strong> {file.name}</p>
                    {/*{info && (
                        <>
                            <p><strong>Description:</strong> {info.description}</p>
                            <p><strong>Date Modified:</strong> {info.dateModified}</p>
                        </>
                    )}*/}
                </div>
            </DialogContent>
        </Dialog>
    )
}

