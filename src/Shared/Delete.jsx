"use client";

import { Button, Modal } from "flowbite-react";
import React from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { deleteProduct } from "../constants";

function DeleteModel({ item, itemId, open, setOpen, setData, url }) {
	return (
		<React.Fragment>
			<Modal show={open} size="md" onClose={() => setOpen(false)} popup>
				<Modal.Header />
				<Modal.Body>
					<div className="text-center">
						<HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
						<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
							Are you sure you want to delete this {item}?
						</h3>
						<div className="flex justify-center gap-4">
							<Button
								color="failure"
								onClick={() => {
									deleteProduct(itemId, setData, url, item);
									setOpen(false);
								}}>
								{"Yes, I'm sure"}
							</Button>
							<Button
								color="gray"
								onClick={() => {
									setOpen(false);
								}}>
								No, cancel
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</React.Fragment>
	);
}

export default DeleteModel;
