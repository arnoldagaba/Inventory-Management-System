import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
	PlusIcon,
	MagnifyingGlassIcon,
	EyeIcon,
	PencilSquareIcon,
	TrashIcon,
} from "@heroicons/react/24/outline";
import {
	Card,
	Container,
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
	Badge,
	Button,
	Input,
} from "../../components/ui";
import { formatCurrency } from "../../utils/formatNumber";
import { products, productCategories, tableHeaders } from "../../constants/constants";
import { toast } from "react-toastify";

const Products = () => {
	const [sortConfig, setSortConfig] = useState({
		key: "name",
		direction: "asc",
	});
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");

	const handleSort = useCallback((key) => {
		setSortConfig((prev) => ({
			key,
			direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
		}));
	}, []);

	const handleView = useCallback((product) => {
		toast.info(`Viewing product ${product.name}`);
	}, []);

	const handleEdit = useCallback((e, product) => {
		e.stopPropagation();
		toast.info(`Editing product ${product.name}`);
	}, []);

	const handleDelete = useCallback((e, product) => {
		e.stopPropagation();
		toast.info(`Deleting product ${product.name}`);
	}, []);

	const sortedProducts = [...products].sort((a, b) => {
		const aValue = a[sortConfig.key];
		const bValue = b[sortConfig.key];

		if (sortConfig.key === "price" || sortConfig.key === "stock") {
			return sortConfig.direction === "asc"
				? Number(aValue) - Number(bValue)
				: Number(bValue) - Number(aValue);
		}

		return sortConfig.direction === "asc"
			? String(aValue).localeCompare(String(bValue))
			: String(bValue).localeCompare(String(aValue));
	});

	const filteredProducts = sortedProducts.filter(
		(product) =>
			(selectedCategory === "all" || product.category === selectedCategory) &&
			(product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				product.sku.toLowerCase().includes(searchQuery.toLowerCase()))
	);

	return (
		<Container>
			<div className="space-y-6">
				<div className="flex flex-col sm:flex-row justify-between gap-4">
					<div className="flex flex-col sm:flex-row gap-4">
						<Input
							type="text"
							placeholder="Search products..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							icon={MagnifyingGlassIcon}
							className="w-full sm:w-64"
						/>

						<select
							value={selectedCategory}
							onChange={(e) => setSelectedCategory(e.target.value)}
							
						>
							<option value="all">All Categories</option>
							{productCategories.map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</select>
					</div>

					<Button onClick={() => toast.info("Add new product")}>
						<PlusIcon className="h-5 w-5 mr-2" />
						Add Product
					</Button>
				</div>

				<Card>
					<div className="overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow>
									{tableHeaders.products.map(({ key, label }) => (
										<TableHead
											key={key}
											onClick={() => handleSort(key)}
											className="cursor-pointer group"
										>
											<div className="flex items-center space-x-1">
												<span>{label}</span>
											</div>
										</TableHead>
									))}
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredProducts.map((product, index) => (
									<motion.tr
										key={product.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.05 }}
										onClick={() => handleView(product)}
										className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
									>
										<TableCell className="flex items-center space-x-3">
											<img
												src={product.image}
												alt={product.name}
												className="h-10 w-10 rounded-lg object-cover"
											/>
											<span>{product.name}</span>
										</TableCell>
										<TableCell>{product.sku}</TableCell>
										<TableCell>{formatCurrency(product.price)}</TableCell>
										<TableCell>
											<Badge
												variant={product.stock > 20 ? "success" : "warning"}
												size="sm"
											>
												{product.stock} in stock
											</Badge>
										</TableCell>
										<TableCell>{product.category}</TableCell>
										<TableCell>
											<div className="flex items-center space-x-2">
												<Button
													variant="ghost"
													size="sm"
													onClick={() => handleView(product)}
													className="p-1"
												>
													<EyeIcon className="h-4 w-4" />
												</Button>
												<Button
													variant="ghost"
													size="sm"
													onClick={(e) => handleEdit(e, product)}
													className="p-1"
												>
													<PencilSquareIcon className="h-4 w-4" />
												</Button>
												<Button
													variant="ghost"
													size="sm"
													onClick={(e) => handleDelete(e, product)}
													className="p-1 text-red-600 dark:text-red-400"
												>
													<TrashIcon className="h-4 w-4" />
												</Button>
											</div>
										</TableCell>
									</motion.tr>
								))}
							</TableBody>
						</Table>
					</div>
				</Card>
			</div>
		</Container>
	);
};

export default Products;
