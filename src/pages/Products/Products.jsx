import { Fragment, useState } from "react";
import {
	Description,
	Dialog,
	DialogTitle,
	Transition,
} from "@headlessui/react";
import {
	TableCellsIcon,
	ListBulletIcon,
	PencilSquareIcon,
	TrashIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { category, products2 } from "../../constants/constants";
import { formatNumberWithComma } from "../../utils/formatNumber";

const ProductsPage = () => {
	const [isGridView, setIsGridView] = useState(true);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleProductClick = (product) => {
		setSelectedProduct(product);
		setIsModalOpen(true);
	};

	const handleDelete = (id) => {
		toast.success(`Product ${id} deleted successfully!`);
	};

	return (
		// TODO: Implement search, filter and sorting filters
		<div className="p-4 space-y-6">
			{/* Header: Search, Filters, Sorting */}
			<div className="flex items-center space-x-4 mb-4">
				<input
					type="text"
					placeholder="Search Products..."
					className="px-4 py-2 border rounded-lg w-1/2 dark:placeholder:text-gray-100 dark:text-white dark:bg-gray-700 outline-none"
				/>

				<select className="px-4 py-2 border rounded-lg cursor-pointer outline-none dark:text-white dark:bg-slate-700">
					{category.map((category) => (
						<option key={category.value} value={category.value}>
							{category.name}
						</option>
					))}
				</select>

				<div className="flex items-center space-x-2">
					<label className="dark:text-white">Price Range:</label>

					<input
						type="number"
						placeholder="Min"
						className="px-2 py-1 border rounded-lg w-20 dark:placeholder:text-gray-200 dark:bg-slate-700"
					/>

					<input
						type="number"
						placeholder="Max"
						className="px-2 py-1 border rounded-lg w-20 dark:placeholder:text-gray-200 dark:bg-slate-700"
					/>
				</div>

				<select className="px-4 py-2 border rounded-lg dark:text-white dark:bg-slate-700">
					<option value="low-to-high">Price: Low to High</option>
					<option value="high-to-low">Price: High to Low</option>
				</select>

				<div className="flex items-center space-x-2 ml-auto">
					<button
						onClick={() => setIsGridView(true)}
						className={`${
							isGridView ? "text-blue-500 dark:text-blue-400" : "text-gray-500"
						}`}
					>
						<TableCellsIcon className="h-6 w-6" />
					</button>

					<button
						onClick={() => setIsGridView(false)}
						className={`${
							!isGridView ? "text-blue-500 dark:text-blue-400" : "text-gray-500"
						}`}
					>
						<ListBulletIcon className="h-6 w-6" />
					</button>
				</div>
			</div>

			{/* Main Section: Product Grid/List */}
			<div
				className={`grid ${
					isGridView ? "grid-cols-1 md:grid-cols-3 gap-4" : "space-y-4"
				}`}
			>
				{products2.map((product, index) => (
					<motion.div
						key={product.id}
						onClick={() => handleProductClick(product)}
						className={`p-4 bg-white dark:bg-slate-700 dark:text-white rounded-lg shadow-md cursor-pointer ${
							isGridView ? "" : "flex items-center"
						}`}
						whileHover={{ scale: 1.03 }}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.1 }}
					>
						<img
							src={product.image}
							alt={product.name}
							className={`rounded ${
								isGridView
									? "w-full h-32 object-cover"
									: "w-20 h-20 object-cover mr-4"
							}`}
						/>

						<div className={`${isGridView ? "text-center" : ""} space-y-2`}>
							<h3 className="text-lg font-semibold">{product.name}</h3>
							<p className="text-sm text-gray-300">{product.category}</p>
							<p className="text-lg font-bold">
								UGX {formatNumberWithComma(product.price)}
							</p>
							<p
								className={`text-sm font-semibold ${
									product.stock > 0 ? "text-green-500" : "text-red-500"
								}`}
							>
								{product.stock > 0
									? `In Stock: ${product.stock}`
									: "Out of Stock"}
							</p>

							{/* Edit/Delete Buttons on Hover */}
							<div className="flex space-x-2 justify-center opacity-0 group-hover:opacity-100 transition-opacity">
								<button
									onClick={(e) => {
										e.stopPropagation();
										toast.info("Edit Product");
									}}
									className="text-blue-500"
								>
									<PencilSquareIcon className="h-6 w-6" />
								</button>

								<button
									onClick={(e) => {
										e.stopPropagation();
										handleDelete(product.id);
									}}
									className="text-red-500"
								>
									<TrashIcon className="h-6 w-6" />
								</button>
							</div>
						</div>
					</motion.div>
				))}
			</div>

			{/*  TODO: Fix the modal */}
			{/* Product Detail Modal */}
			<Transition show={isModalOpen} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-10 overflow-y-auto"
					onClose={() => setIsModalOpen(false)}
				>
					<div className="flex items-center justify-center min-h-screen px-4">
						<Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

						<motion.div
							className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 space-y-4 z-20"
							initial={{ scale: 0.5, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.5, opacity: 0 }}
							transition={{ duration: 0.3, ease: "easeOut" }}
						>
							<DialogTitle className="text-lg font-semibold">
								{selectedProduct?.name}
							</DialogTitle>

							<Description className="text-gray-600">
								{selectedProduct?.category}
							</Description>

							<img
								src={selectedProduct?.image}
								alt={selectedProduct?.name}
								className="w-full h-48 object-cover rounded-md"
							/>

							<p className="text-sm text-gray-500">
								{selectedProduct?.description ||
									"This is a detailed description of the product."}
							</p>

							<div className="flex items-center justify-between">
								<p className="text-lg font-bold">
									UGX {formatNumberWithComma(selectedProduct?.price)}
								</p>

								<p
									className={`text-sm ${
										selectedProduct?.stock > 0
											? "text-green-700"
											: "text-red-700"
									}`}
								>
									{selectedProduct?.stock > 0
										? `In Stock: ${selectedProduct.stock}`
										: "Out of Stock"}
								</p>
							</div>

							<div className="flex justify-end space-x-4 mt-4">
								<button
									onClick={() => toast.info("Editing Product...")}
									className="bg-blue-700 text-white px-4 py-2 rounded-md"
								>
									Edit
								</button>

								<button
									onClick={() => toast.success("Stock updated!")}
									className="bg-green-700 text-white px-4 py-2 rounded-md"
								>
									Update Stock
								</button>
							</div>
						</motion.div>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
};

export default ProductsPage;
