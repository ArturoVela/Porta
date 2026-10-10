// Run from the project root: swift scripts/generate-dev-qr.swift
import Foundation
import CoreImage
import ImageIO
import Vision

let destination = URL(fileURLWithPath: "public/assets/images/portfolio", isDirectory: true)
let context = CIContext()
for (locale, path) in [("es", "/dev"), ("en", "/en/dev")] {
    let url = "https://velaarturo.com" + path
    let filter = CIFilter(name: "CIQRCodeGenerator")!
    filter.setValue(Data(url.utf8), forKey: "inputMessage")
    filter.setValue("M", forKey: "inputCorrectionLevel")
    let output = filter.outputImage!
    let scale = 8, margin = 4 * scale
    let width = Int(output.extent.width) * scale + 2 * margin
    let bitmap = CGContext(data: nil, width: width, height: width, bitsPerComponent: 8,
                           bytesPerRow: width * 4, space: CGColorSpaceCreateDeviceRGB(),
                           bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
    bitmap.setFillColor(CGColor(red: 1, green: 1, blue: 1, alpha: 1))
    bitmap.fill(CGRect(x: 0, y: 0, width: width, height: width))
    bitmap.interpolationQuality = .none
    bitmap.draw(context.createCGImage(output, from: output.extent)!,
                in: CGRect(x: margin, y: margin, width: width - 2 * margin, height: width - 2 * margin))
    let image = bitmap.makeImage()!
    let check = VNDetectBarcodesRequest()
    check.symbologies = [.qr]
    try VNImageRequestHandler(cgImage: image).perform([check])
    precondition(check.results?.first?.payloadStringValue == url, "QR decode failed")
    let file = destination.appendingPathComponent("dev-qr-\(locale).png")
    let png = CGImageDestinationCreateWithURL(file as CFURL, "public.png" as CFString, 1, nil)!
    CGImageDestinationAddImage(png, image, [kCGImagePropertyPNGDictionary: [kCGImagePropertyPNGDescription:
        "Generated locally with CoreImage CIQRCodeGenerator. URL: \(url). Correction M; four-module quiet zone; verified with Vision."]] as CFDictionary)
    precondition(CGImageDestinationFinalize(png), "PNG write failed")
    print("Verified \(file.lastPathComponent): \(url)")
}
