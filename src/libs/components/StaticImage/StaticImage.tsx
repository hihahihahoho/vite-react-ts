import clsx from 'clsx';
import {
	LazyLoadImage,
	LazyLoadImageProps,
} from 'react-lazy-load-image-component';
import style from './StaticImage.module.scss';
export interface StaticImageProps extends LazyLoadImageProps {
	src: string;
}

const getImgUrl = (imageNameWithExtension: string) =>
	new URL(`${imageNameWithExtension}`, import.meta.url).href;

export function StaticImage({
	src,
	className,
	alt = 'image',
	wrapperClassName,
	...props
}: StaticImageProps) {
	return (
		<LazyLoadImage
			wrapperClassName={clsx(style.StaticImageWrapper, wrapperClassName)}
			src={getImgUrl(`../../../${src}`)}
			alt={alt}
			effect="blur"
			{...props}
		/>
	);
}
