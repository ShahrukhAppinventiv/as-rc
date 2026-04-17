
type BreadcrumbItem = {
    label: string;
    onClick?: () => void;
};

type Props = {
    items: BreadcrumbItem[];
};

export default function Breadcrumbs({ items }: Props) {
    return (
        <div className="flex items-center gap-2 text-sm mb-2">
            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <span key={index} className="flex items-center gap-2 text-[18px] font-[500] text-blue-500">
                        <span
                            onClick={!isLast ? item.onClick : undefined}
                            className={` ${isLast
                                ? " cursor-default"
                                : " cursor-pointer hover:underline"
                                }`}
                        >
                            {item.label}
                        </span>

                        {!isLast && <span className="">{'>'}</span>}
                    </span>
                );
            })}
        </div>
    );
}