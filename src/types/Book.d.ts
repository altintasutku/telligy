declare type SelectBook = {
    title: string;
    description: string;
    price: number;
    banner: string;
    discount: number;
    pdf: string;
    cover: string;
    currency: string;
    pageCount: number;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deleted: boolean;
    deletedAt: Date | null;
    categories: {name:string}[];
}