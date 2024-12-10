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

const SvgIcon = ({ iconId, className, style, onClick }: SvgType) => {
  return (
    <svg className={className} style={style} onClick={onClick}>
      <use href={`/assets/svg/icon-sprite.svg#${iconId}`}></use>
    </svg>
  );
};

export default SvgIcon;
