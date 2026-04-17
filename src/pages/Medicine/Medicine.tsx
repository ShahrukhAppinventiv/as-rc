import { useState } from "react";
import { MedicineCard } from "./Card";
import { useMedicine } from "./helpers";


export default function Medicine() {

    const { medicineList } = useMedicine()
    console.log(medicineList)

    return (
        <div className="p-6">
            <h1>Medicine</h1>
         
        </div>
    );
}