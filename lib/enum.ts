export class ProductStatusEnum {
    color: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    value: string;
    constructor(value: string) {
        this.color = 'default';
        this.value = value;
    }

    getColor() {
        if (this.value === 'out_of_stock') {
            return 'destructive';
        } else if (this.value === 'available') {
            return 'outline';
        } else if (this.value === 'reserved') {
            return 'warning';
        } else {
            return 'outline';
        }
    }
    getLabel() {
        return this.value.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");;
    }
}