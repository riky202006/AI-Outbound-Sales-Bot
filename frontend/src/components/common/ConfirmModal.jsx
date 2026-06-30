import Card from "./Card";
import Button from "./Button";
import { AlertTriangle } from "lucide-react";

function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

      <Card className="w-full max-w-md p-8">

        <div className="text-center">

          <AlertTriangle
            size={55}
            className="mx-auto text-red-400 mb-4"
          />

          <h2 className="text-2xl font-bold mb-3">
            {title}
          </h2>

          <p className="text-slate-400 mb-8">
            {message}
          </p>

          <div className="flex gap-4">

            <Button
              variant="secondary"
              className="flex-1"
              onClick={onCancel}
            >
              Cancel
            </Button>

            <Button
              variant="danger"
              className="flex-1"
              onClick={onConfirm}
            >
              Delete
            </Button>

          </div>

        </div>

      </Card>

    </div>
  );
}

export default ConfirmModal;