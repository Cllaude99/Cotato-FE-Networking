interface IFormButton {
  loading: boolean;
  text: string;
}

export default function FormButton({ loading, text }: IFormButton) {
  return (
    <button
      className="primary-btn h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
      disabled={loading}
    >
      {loading ? '잠시만 기다려 주세요...' : text}
    </button>
  );
}
