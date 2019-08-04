package com.user.gestion.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.user.gestion.dao.UtilisateurRepository;
import com.user.gestion.entities.Utitlisateur;

@Controller
public class UtilisateurController {

	@Autowired
	UtilisateurRepository utilisateurRepository;

	@RequestMapping(path = "/safa", method = RequestMethod.GET)
	public String getIndex(Model model) {
		List<Utitlisateur> utitlisateurs = utilisateurRepository.findAll();
		model.addAttribute("users", utitlisateurs);
		Utitlisateur utitlisateur = new Utitlisateur();
		model.addAttribute("utitlisateur", utitlisateur);
		return "index";
	}

	@RequestMapping(path = "/adduser", method = RequestMethod.POST)
	@ResponseBody
	public void adduser(@RequestBody Utitlisateur user, Model model) {
		utilisateurRepository.save(user);
		Utitlisateur utitlisateur = new Utitlisateur();
		model.addAttribute("utitlisateur", utitlisateur);
	}

	@RequestMapping(path = "/update", method = RequestMethod.POST)
	@ResponseBody
	public Utitlisateur updateUser(@RequestBody Utitlisateur user) {
		user = utilisateurRepository.save(user);
		return user;
	}

	@GetMapping("/delete")
	@ResponseBody
	public void deleteUser(@RequestParam("id") Integer id, Model model) {
		Utitlisateur user = utilisateurRepository.checherUtilisateur(id);
		utilisateurRepository.delete(user);
	}
	
	
	
	@GetMapping(path = "/userInfo")
	@ResponseBody
	public Utitlisateur editUtilisateur(@RequestParam("id") Integer id) {
		Utitlisateur utitlisateur = utilisateurRepository.checherUtilisateur(id);
		return utitlisateur;
	}

}
