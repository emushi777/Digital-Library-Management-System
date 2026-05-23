<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\Author;
use App\Models\Category;

class BookImportController extends Controller
{
    public function import(Request $request)
    {
        if (!$request->hasFile('file')) {
            return back()->with('error', "Skedari nuk u gjet!");
        }

        $file = $request->file('file');
        $handle = fopen($file->getRealPath(), "r");
        
        $processed = 0;
        $header = true;

        while (($row = fgetcsv($handle, 1000, ",")) !== FALSE) {
            if ($header) { $header = false; continue; }
            if (empty(array_filter($row))) continue;

            // 1. Ndajmë emrin dhe mbiemrin nga kolona e autorit
            $fullAuthorName = trim($row[1]);
            $parts = explode(' ', $fullAuthorName, 2);
            $emri = $parts[0];
            $mbiemri = $parts[1] ?? 'N/A'; // Nëse s'ka mbiemër, vendos 'N/A'

            // 2. Krijojmë autorin duke i dhënë vlerat për të gjitha fushat NOT NULL
            $author = Author::firstOrCreate(
                ['emri' => $emri, 'mbiemri' => $mbiemri]
            );

            // 3. Krijojmë kategorinë (sigurohu që edhe kjo tabelë nuk ka fusha të tjera të detyrueshme)
            $category = Category::firstOrCreate(['emertimi' => trim($row[2])]);

            // 4. Shton ose përditëson librin
            Book::updateOrCreate(
                ['isbn' => trim($row[3])],
                [
                    'titulli'         => $row[0],
                    'autori_id'       => $author->id,
                    'kategoria_id'    => $category->id,
                    'viti_botimit'    => $row[4] ?? null,
                    'gjuha'           => $row[5] ?? 'EN',
                    'numri_faqeve'    => $row[6] ?? 0,
                    'formati'         => 'Hardcover',
                    'madhesia_mb'     => 0,
                    'shtegu_skedarit' => 'n/a',
                ]
            );
            $processed++;
        }
        fclose($handle);

        return redirect()->route('books.index')->with('success', "U importuan $processed libra.");
    }
}