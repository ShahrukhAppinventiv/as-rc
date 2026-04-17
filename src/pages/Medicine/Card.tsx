import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export function MedicineCard({ data }) {
  return (
    <Card className="rounded-2xl shadow-md hover:shadow-lg transition">
      
      <CardMedia
        component="img"
        height="160"
        image={data.image}
        alt={data.name}
      />

      <CardContent>
        <Typography variant="h6" className="font-semibold">
          {data.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Brand: {data.brand}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          SKU: {data.sku}
        </Typography>

        <Typography className="text-green-600 font-bold mt-2">
          ₹{data.price}
        </Typography>

        <Typography className="mt-2 text-gray-600 line-clamp-2">
          {data.description}
        </Typography>
      </CardContent>
    </Card>
  );
}