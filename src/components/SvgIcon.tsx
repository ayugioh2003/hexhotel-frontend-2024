type SvgIconProps = {
  name: string,
  width?: string | number,
  height?: string | number,
  color?: string,
  className?: string,
}

export default function SvgIcon({
  name,
  width,
  height,
  color,
  className,
}:SvgIconProps) {

  const symbolId = `#${name}`

  return(
    <svg aria-hidden="true" width={width} height={height} className={className}>
      <use href={symbolId} fill={color} />
    </svg>
  )
}
