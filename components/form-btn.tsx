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
      {loading ? '확인 중.' : text}
    </button>
  );
}
