package br.com.masterclass.superpecas.controller;

import br.com.masterclass.superpecas.model.DTO.ApiResponse;
import br.com.masterclass.superpecas.model.DTO.PecaDTO;
import br.com.masterclass.superpecas.model.DTO.TopKCarrosPecasDTO;
import br.com.masterclass.superpecas.model.Peca;
import br.com.masterclass.superpecas.service.PecasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/peca")
public class PecasController {

    private PecasService pecasService;

    @Autowired
    public PecasController(PecasService pecasService){
        this.pecasService = pecasService;
    }

    @RequestMapping(method = RequestMethod.GET, value = "{id}")
    public ApiResponse<PecaDTO> buscarPorId (
            @PathVariable Long id
    ){
        PecaDTO pecaDTO = this.pecasService.buscarPorId(id);
        return new ApiResponse<>("Sucesso!", pecaDTO);
    }

    @RequestMapping(method = RequestMethod.GET, value = "listaTodosPaginado")
    public ApiResponse<Page<Peca>> listaTodosPaginado (
            @RequestParam int page,
            @RequestParam int size
    ) {
        Page<Peca> paginaPecas = this.pecasService.listaTodosPaginado(page, size);
        return new ApiResponse<>("Sucesso!",paginaPecas);
    }

    @RequestMapping(method = RequestMethod.GET, value = "listaTodosPaginado/{termo}")
    public ApiResponse<Page<Peca>> listaTodosPaginado (
            @PathVariable String termo,
            @RequestParam int page,
            @RequestParam int size
    ) {
        Page<Peca> paginaPecas = this.pecasService.listaTodosPaginadoPorTermo(termo, page, size);
        return new ApiResponse<>("Sucesso!", paginaPecas);
    }

    @RequestMapping(method = RequestMethod.GET, value = "listaTop10CarroComMaisPecas")
    public ApiResponse<List<TopKCarrosPecasDTO>> listarTopCarrosMaisPecas () {
        List<TopKCarrosPecasDTO> listaTopCarros = this.pecasService.buscarCarrosComMaisPecas();

        return new ApiResponse<>("Sucesso!", listaTopCarros);
    }

    @RequestMapping(method = RequestMethod.PATCH, value = "{id}")
    public ApiResponse<PecaDTO> editarPeca (
            @PathVariable Long id,
            @RequestBody PecaDTO dto
    ) {
        PecaDTO pecaDTO = this.pecasService.editarPeca(id, dto);
        return new ApiResponse<>("Atualizado com sucesso!", pecaDTO);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "{id}")
    public ApiResponse<String> excluirPeca (
            @PathVariable Long id
    ) {
        this.pecasService.excluirPeca(id);
        return new ApiResponse<>("Deletado com sucesso!", null);
    }


}
