import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import {
	PlusIcon,
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
	Pagination,
} from "../../components/ui";
import { formatCurrency } from "../../utils/formatNumber";
import { products, productCategories } from "../../constants/constants";
import { toast } from "react-toastify";
import { ProductDetails } from '../../components/ProductDetails';
import { cn } from "../../utils/cn";

const Products = () => {
	const [sortConfig, setSortConfig] = useState({
		key: "name",
		direction: "asc",
	});
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	const handleSort = useCallback((key) => {
		setSortConfig((prev) => ({
			key,
			direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
		}));
	}, []);

	const handleView = useCallback((product) => {
		setSelectedProduct(product);
		setIsDetailsOpen(true);
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

	const filteredProducts = useMemo(() => {
		return sortedProducts.filter(
			(product) =>
				(selectedCategory === "all" || product.category === selectedCategory) &&
				(product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					product.sku.toLowerCase().includes(searchQuery.toLowerCase()))
		);
	}, [sortedProducts, selectedCategory, searchQuery]);

	const paginatedProducts = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
	}, [filteredProducts, currentPage]);

	const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	return (
		<Container>
			<div className="space-y-6">
				<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
					<div className="flex flex-col flex-1 max-w-2xl gap-4 sm:flex-row sm:items-center">
						<Input
							type="text"
							placeholder="Search products..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full sm:w-80"
						/>

						<div className="relative w-full sm:w-56">
							<select
								value={selectedCategory}
								onChange={(e) => setSelectedCategory(e.target.value)}
								className={cn(
									"w-full px-3 py-2 pr-8 rounded-lg appearance-none",
									"border border-gray-300 dark:border-gray-600",
									"bg-white dark:bg-gray-800",
									"text-gray-900 dark:text-gray-100",
									"focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400",
									"focus:border-blue-500 dark:focus:border-blue-400",
									"outline-none transition-colors duration-200"
								)}
							>
								<option value="all">All Categories</option>
								{productCategories.map((category) => (
									<option key={category} value={category}>
										{category}
									</option>
								))}
							</select>
							
							<div className="absolute inset-y-0 flex items-center pointer-events-none right-2">
								<ChevronDownIcon className="w-4 h-4 text-gray-500" />
							</div>
						</div>
					</div>

					<Tooltip content="Create a new product">
						<Button 
							onClick={() => toast.info("Add new product")}
							className="w-full text-white bg-blue-600 sm:w-auto hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
						>
							<PlusIcon className="w-5 h-5 mr-2" />
							Add Product
						</Button>
					</Tooltip>
				</div>

				<Card className="overflow-hidden">
					<div className="overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Product</TableHead>
									<TableHead className="hidden md:table-cell">SKU</TableHead>
									<TableHead>Price</TableHead>
									<TableHead>Stock</TableHead>
									<TableHead className="hidden lg:table-cell">Category</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>

							<TableBody>
								{paginatedProducts.map((product, index) => (
									<motion.tr
										key={product.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.05 }}
										onClick={() => handleView(product)}
										className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
									>
										<TableCell>
											<div className="flex items-center space-x-3">
												<img
													src={product.image}
													alt={product.name}
													className="object-cover w-10 h-10 rounded-lg"
												/>
												<div>
													<p className="font-medium text-gray-900 dark:text-white">
														{product.name}
													</p>
													<p className="text-sm text-gray-500 dark:text-gray-400 md:hidden">
														{product.sku}
													</p>
												</div>
											</div>
										</TableCell>

										<TableCell className="hidden md:table-cell">
											{product.sku}
										</TableCell>

										<TableCell>{formatCurrency(product.price)}</TableCell>

										<TableCell>
											<Badge
												variant={product.stock > 20 ? "success" : "warning"}
												size="sm"
											>
												{product.stock} in stock
											</Badge>
										</TableCell>

										<TableCell className="hidden lg:table-cell">
											{product.category}
										</TableCell>

										<TableCell>
											<div className="flex items-center space-x-2">
												<Tooltip content="View Product">
													<Button
														variant="ghost"
														size="sm"
														onClick={() => handleView(product)}
														className="p-1"
													>
														<EyeIcon className="w-4 h-4" />
													</Button>
												</Tooltip>

												<Tooltip content="Edit Product">
													<Button
														variant="ghost"
														size="sm"
														onClick={(e) => handleEdit(e, product)}
														className="p-1"
													>
														<PencilSquareIcon className="w-4 h-4" />
													</Button>
												</Tooltip>

												<Tooltip content="Delete Product">
													<Button
														variant="ghost"
														size="sm"
														onClick={(e) => handleDelete(e, product)}
														className="p-1 text-red-600 dark:text-red-400"
													>
														<TrashIcon className="w-4 h-4" />
													</Button>
												</Tooltip>
											</div>
										</TableCell>
									</motion.tr>
								))}
							</TableBody>
						</Table>
					</div>

					{filteredProducts.length > 0 ? (
						<div className="px-4 mt-4">
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={handlePageChange}
								itemsPerPage={itemsPerPage}
								totalItems={filteredProducts.length}
							/>
						</div>
					) : (
						<div className="py-8 text-center text-gray-500 dark:text-gray-400">
							No products found matching your search.
						</div>
					)}
				</Card>
			</div>

			<ProductDetails
				product={selectedProduct}
				isOpen={isDetailsOpen}
				onClose={() => {
					setIsDetailsOpen(false);
					setSelectedProduct(null);
				}}
			/>
		</Container>
	);
};

export default Products;
