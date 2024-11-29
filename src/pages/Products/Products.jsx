import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
	PlusIcon,
	MagnifyingGlassIcon,
	EyeIcon,
	PencilSquareIcon,
	TrashIcon,
	ChevronDownIcon,
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
	Tooltip,
} from "../../components/ui";
import { formatCurrency } from "../../utils/formatNumber";
import {
	products,
	productCategories,
	tableHeaders,
} from "../../constants/constants";
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
							className="w-full sm:w-64"
						/>

						<div className="relative w-56">
							<select
								value={selectedCategory}
								onChange={(e) => setSelectedCategory(e.target.value)}
								className="appearance-none w-full px-3 py-2 pr-8 rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 
								text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
								focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-colors duration-200
								hover:border-gray-400 dark:hover:border-gray-500 [-webkit-appearance:none] [-moz-appearance:none] [&::-ms-expand]:hidden"
							>
								<option value="all">All Categories</option>
								{productCategories.map((category) => (
									<option 
										key={category} 
										value={category}
										className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
									>
										{category}
									</option>
								))}
							</select>
							<div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
								<ChevronDownIcon className="h-4 w-4 text-gray-500" />
							</div>
						</div>
					</div>

					<Tooltip content="Create a new product">
						<Button 
							onClick={() => toast.info("Add new product")}
							className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white dark:text-gray-100 transition-colors duration-200 whitespace-nowrap inline-flex items-center"
						>
							<PlusIcon className="h-5 w-5 mr-2" />
							Add Product
						</Button>
					</Tooltip>
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
												<Tooltip content="View Product">
													<Button
														variant="ghost"
														size="sm"
														onClick={() => handleView(product)}
														className="p-1"
													>
														<EyeIcon className="h-4 w-4" />
													</Button>
												</Tooltip>

												<Tooltip content="Edit Product">
													<Button
														variant="ghost"
														size="sm"
														onClick={(e) => handleEdit(e, product)}
														className="p-1"
													>
														<PencilSquareIcon className="h-4 w-4" />
													</Button>
												</Tooltip>

												<Tooltip content="Delete Product">
													<Button
														variant="ghost"
														size="sm"
														onClick={(e) => handleDelete(e, product)}
														className="p-1 text-red-600 dark:text-red-400"
													>
														<TrashIcon className="h-4 w-4" />
													</Button>
												</Tooltip>
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
