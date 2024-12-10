interface SvgType {
  iconId: string | undefined;
  className?: string;
  style?: {
    height?: number;
    width?: number;
    fill?: string;
    marginRight?: number;
  };
  onClick?: () => void;
}

const SVG: React.FC<SvgType> = ({ iconId, className, style, onClick }) => {
  return (
    <svg className={className} style={style} onClick={onClick}>
      <use href={`/assets/svg/iconly-sprite.svg#${iconId}`}></use>
    </svg>
  );
};

export default SVG;
