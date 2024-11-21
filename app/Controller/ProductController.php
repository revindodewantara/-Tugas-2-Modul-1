<?php

// File: C:\xampp\htdocs\app\Controller\ProductController.php
namespace app\Controller;

include_once __DIR__ . '/../Traits/ApiResponseFormatter.php';
include_once __DIR__ . '/../Models/Product.php';

use app\Models\Product;
use app\Traits\ApiResponseFormatter;

class ProductController {

    // Your class methods here...

    use ApiResponseFormatter;

    public function index()
    {
        // DEFINISI OBJEK MODEL PRODUCT YANG SUDAH DIBUAT
        $productModel = new Product();
        $response = $productModel->findAll();
        // RESPONSE DENGAN MELAKUKAN FORMATTING TERLEBIH DAHULU MENGGUNAKAN TRAIT YANG SUDAH DIPANGGIL
        return $this->apiResponse(200, "success", $response);
    }

    public function getById($id)
    {
        $productModel = new Product();
        $response = $productModel->findById($id);
        return $this->apiResponse(200, "success", $response);
    }

    public function insert() {
        // TANGGAP INPUT JSON
        $jsonInput = file_get_contents("php://input");
        $inputData = json_decode($jsonInput, true);
    
        // VALIDASI INPUT VALID ATAU TIDAK
        if (json_last_error() || empty($inputData['product_name'])) {
            return $this->apiResponse(400, "Error: invalid input", null);
        }
    
        $productModel = new Product();
        $response = $productModel->create([
            "product_name" => $inputData["product_name"]
        ]);
    
        if ($response['success']) {
            return $this->apiResponse(200, "Product created successfully", ["id" => $response["id"]]);
        } else {
            return $this->apiResponse(500, "Error creating product", ["error" => $response["error"]]);
        }
    }
    

    public function update($id)
    {
        $jsonInput = file_get_contents("php://input");
        $inputData = json_decode($jsonInput, true);
        if (json_last_error()) {
            return $this->apiResponse(400, "Error invalid input", null);
        }

        $productModel = new Product();
        $response = $productModel->update([
            "product_name" => $inputData["product_name"]
        ], $id);

        return $this->apiResponse(200, "success", $response);
    }

    public function delete($id)
    {
        $productModel = new Product();
        $response = $productModel->delete($id);

        return $this->apiResponse(200, "success", $response);
    }
}