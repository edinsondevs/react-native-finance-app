

export interface InterfaceDeleteProps {
    id: number | undefined;
    deleteMutation: {
        mutate: () => void;
    };
}

export interface InterfaceUpdateProps {
    id: number | undefined;
    updateMutation: {
        mutate: (data: {
            monto: number;
            descripcion: string;
            user_id?: string;
        }) => void;
    };
    user_id?: string;
}