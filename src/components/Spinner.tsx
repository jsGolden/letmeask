import '../styles/spinner.scss';

type SpinnerProps = {
  size?: number;
}

export function Spinner({ size = 65 }: SpinnerProps) {
  return (
    <div
      id="spinner"
      style={{
        width: size,
        height: size
      }}
    >
    </div>
  );
}
