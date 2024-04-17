import "../layouts/ModalLayout.css";

function ModalLayout({children}) {

    return (
        <div className="modal-background">
            <div className="modal-content">
                    {children}
            </div>
        </div>
    );
}

export default ModalLayout;